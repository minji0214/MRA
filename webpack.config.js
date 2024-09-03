const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvWebpack = require("dotenv-webpack");

const buildMode = process.env.NODE_ENV === "dev" ? "development" : "production";
module.exports = {
	entry: "./src/app.js", //번들링의 시작점 계산
	output: {
		path: path.resolve(__dirname, "dist"), // 번들링된 파일이 저장될 경로
		filename: "bundle.[fullhash].js", // 번들링된 파일의 이름
	},
	module: {
		rules: [
			{
				test: /\.js$/, //파일 확장자 별로 처리
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	mode: buildMode,
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlwebpackPlugin({
			template: "./index.html",
			filename: "index.html",
		}),
		new DotenvWebpack({
			path: `./env.${process.env.NODE_ENV || "dev"} `,
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
		port: 9000,
		open: true,
	},
};
