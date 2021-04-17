import generator from "generate-password";
export default (req, res) => {
	res.status(200).json({ result: generator.generate(req.query) })
}
	