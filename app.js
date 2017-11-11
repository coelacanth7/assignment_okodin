var express = require("express");
var app = express();

// ----------------------------------------
// Body Parser
// ----------------------------------------
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
var cookieSession = require("cookie-session");

app.use(
	cookieSession({
		name: "session",
		keys: ["asdf1234567890qwer"]
	})
);

app.use((req, res, next) => {
	res.locals.session = req.session;
	res.locals.currentUser = req.session.currentUser;
	next();
});

// ----------------------------------------
// Flash Messages
// ----------------------------------------
var flash = require("express-flash-messages");
app.use(flash());

// ----------------------------------------
// Method Override
// ----------------------------------------
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");

app.use(
	methodOverride(
		getPostSupport.callback,
		getPostSupport.options // { methods: ['POST', 'GET'] }
	)
);

// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));

// ----------------------------------------
// Referrer
// ----------------------------------------
app.use((req, res, next) => {
	req.session.backUrl = req.header("Referer") || "/";
	next();
});

// ----------------------------------------
// Logging
// ----------------------------------------
var morgan = require("morgan");
var morganToolkit = require("morgan-toolkit")(morgan);

app.use(morganToolkit());

app.use((req, res, next) => {
	["query", "params", "body"].forEach(key => {
		if (req[key]) {
			var capKey = key[0].toUpperCase() + key.substr(1);
			var value = JSON.stringify(req[key], null, 2);
			console.log(`${capKey}: ${value}`);
		}
	});
	next();
});

// ----------------------------------------
// Routes
// ----------------------------------------
var sessionsRouter = require("./routers/sessions")(app);
app.use("/", sessionsRouter);

var frontpageRouter = require("./routers/frontpage");
app.use("/", frontpageRouter);

var associationsRouter = require("./routers/associations");
app.use("/", associationsRouter);

// ----------------------------------------
// Template Engine
// ----------------------------------------
var expressHandlebars = require("express-handlebars");
// var helpers = require("./helpers");

var hbs = expressHandlebars.create({
	partialsDir: "views/",
	defaultLayout: "application"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// ----------------------------------------
// Server
// ----------------------------------------
var port = process.env.PORT || process.argv[2] || 3000;
var host = "localhost";

var args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
	console.log(`Listening: http://${host}:${port}`);
});

app.listen.apply(app, args);

module.exports = app;
