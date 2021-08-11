import fs from "fs"
import path from "path"
import axios from "axios"

export function getImageKey(url) {
  const split = url.split("/")
  const key = split[split.length - 1]
  const keyItems = key.split("?")
  const imageKey = keyItems[0]
  return imageKey
}

function getPathName(url, key, pathName = "downloads") {
  let reqPath = path.join(__dirname, "..")
  key = key.replace(/%/g, "")

  const downloadPath = `${reqPath}/public/${pathName}`
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath)
  }

  const rawPath = `${downloadPath}/${key}`
  return rawPath
}

async function downloadImage(url, imageKey) {
  return new Promise(async (resolve, reject) => {
    const path = getPathName(url, imageKey)
    const writer = fs.createWriteStream(path)

    try {
      const response = await axios.get(url, {
        responseType: "stream",
      })
      response.data.pipe(writer)
      writer.on("finish", resolve)
      writer.on("error", reject)
    } catch (error) {
      console.log(`Error fetching image: ${url}`)
      reject()
    }
  })
}

export default downloadImage
