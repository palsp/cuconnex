import pandas as pd
import mysql.connector
from time import sleep
import os

from surprise import NMF
from surprise import Dataset
from surprise import Reader

def get_connection():
    "Connect to MySQL database."
    try:
        return mysql.connector.connect(host=os.environ['DB_HOST'],
                                       database=os.environ['DB_SCHEMA'],
                                       user=os.environ['DB_USER'],
                                       password=os.environ['DB_PASSWORD'],
                                       autocommit=True)
    except mysql.connector.Error as e:
        print("Error while connecting to MySQL", e)

connection = get_connection()
try:
    checksum = 0
    while True:
        cursor = connection.cursor(dictionary=True)

        # Check for any changes in the rating table.
        cursor.execute("CHECKSUM TABLE rating")
        new_checksum = cursor.fetchone()['Checksum']
        if new_checksum == checksum:
            cursor.close()
            print("No update in rating table detected")
            # Check for update again after 60 seconds.
            sleep(60)
        else:
            checksum = new_checksum
            # Fetch the data from the rating table.
            cursor.execute("SELECT * FROM rating WHERE isRate = 1")
            rows = cursor.fetchall()
            df = pd.DataFrame(rows)

            # A reader is needed but only the rating_scale param is required.
            reader = Reader(rating_scale=(1, 5))

            # The columns must correspond to rater id, ratee id and ratings (in that order).
            data = Dataset.load_from_df(df[['raterId', 'rateeId', 'rating']], reader)

            # Train an NMF algorithm on the dataset.
            trainset = data.build_full_trainset()
            algo = NMF()
            algo.fit(trainset)

            # Predict ratings for all pairs (u, i) where u != i.
            antiset = trainset.build_anti_testset()
            testset = []
            for (uid, iid, r) in antiset:
                if uid != iid:
                    testset.append((uid, iid, r))
            testset.extend(trainset.build_testset())
            predictions = algo.test(testset)

            recommend = []
            for uid, iid, true_r, est, _ in predictions:
                est = float(est)
                recommend.append((uid, iid, est))

            # Update the recommendations table.
            mysql_replace_query = """REPLACE INTO recommendations (userId, recommendeeId, score) VALUES (%s, %s, %s)"""
            for row in recommend:
                cursor.execute(mysql_replace_query, row)
            print("Successfully updated recommendations table")

            # Close the cursor.
            cursor.close()
            
finally:
    connection.close()
    print("MySQL connection is closed")
