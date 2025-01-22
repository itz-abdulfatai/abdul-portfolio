import { mocksettings } from "../constants/index.js"
export async function getSettings(req, res) {
    
    res.send(mocksettings)


}