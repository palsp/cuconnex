import pandas as pd
import mysql.connector

from surprise import SVD
from surprise import Dataset
from surprise import Reader

# Connect to MySQL database.
try:
    connection = mysql.connector.connect(host=DB_HOST,
                                         database=DB_SCHEMA,
                                         user=DB_USER,
                                         password=DB_PASSWORD)

except mysql.connector.Error as e:
    print("Error while connecting to MySQL", e)

# Fetch the data from the rating table.
cursor = connection.cursor(dictionary=True)
cursor.execute("select * from rate")
rows = cursor.fetchall()
df = pd.DataFrame(rows)

# A reader is needed but only the rating_scale param is required.
reader = Reader(rating_scale=(1, 5))

# The columns must correspond to rater id, ratee id and ratings (in that order).
data = Dataset.load_from_df(df[['raterid', 'rateeid', 'rating']], reader)

# Train an SVD algorithm on the dataset.
trainset = data.build_full_trainset()
algo = SVD()
algo.fit(trainset)

# Predict ratings for all pairs (u, i) that are NOT in the training set.
anti_trainset = trainset.build_anti_testset()
testset = []
for (uid, iid, r) in anti_trainset:
    if uid != iid:
        testset.append((uid, iid, r))
predictions = algo.test(testset)

recommend = []
for uid, iid, true_r, est, _ in predictions:
    est = float(est)
    recommend.append((uid, iid, est))

# Update the recommend table.
mysql_replace_query = """REPLACE INTO recommend (userid, recommendeeid, score) VALUES (%s, %s, %s)"""
for row in recommend:
    cursor.execute(mysql_replace_query, row)
connection.commit()
print("Successfully updated recommend table")

# Close the connection.
cursor.close()
connection.close()
print("MySQL connection is closed")
