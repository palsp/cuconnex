"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./routes/app");
var port = process.env.PORT || 3000;
app_1.app.listen(port, function () { return console.log("App listening on port " + port); });
