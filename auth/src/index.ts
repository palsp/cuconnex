import { app } from './routes/app';
import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.routes';

(userRoutes)(app);
(authRoutes)(app);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))


