// @ts-check

import dotenv from "dotenv";
import path from "path";
import stripJsonComments from "strip-json-comments";
import fs from "fs";
import { xml2js, js2xml } from "xml-js";

dotenv.config();

/**
 * @param {string} p The path to resolve
 */
export const resolvePath = p => p.replace("$GAME_DATA", path.join(process.env.SM_INSTALL_DIR, "Data"))
    .replace("$SURVIVAL_DATA", path.join(process.env.SM_INSTALL_DIR, "Survival"))
    .replace("$CHALLENGE_DATA", path.join(process.env.SM_INSTALL_DIR, "ChallengeData"));

/**
 * @param {string} p The path to the json file to load
 */
export const readJsonFile = p => JSON.parse(stripJsonComments(fs.readFileSync(resolvePath(p)).toString()));



export const customizationOptions = readJsonFile("$GAME_DATA/Character/customization_options.json");



console.log(customizationOptions);

let renderables = new Set();

for (let category of customizationOptions.categoryList) {
    console.log(category);
    
    for (let option of category.options) {
        renderables.add(option.male);
        renderables.add(option.female);
    }
}

console.log(renderables);

if (!fs.existsSync("./assets")) {
    fs.mkdirSync("./assets");
}

let models = {};

for (let renderable of renderables) {
    let rend = readJsonFile(renderable);

    let lod = rend.lodList[0];
    
    console.log(lod);
    if (!lod || !lod.mesh) continue;

    console.log(resolvePath(lod.mesh));

    let dae = xml2js(fs.readFileSync(resolvePath(lod.mesh)).toString());

    // console.log(dae);

    for (let name of ["library_images", "library_effects"]) {
        let index = dae.elements[0].elements.findIndex(el => el.name === name);
        if (index !== -1) {
            dae.elements[0].elements.splice(index, 1)
        }
    }
    
    // console.log(dae.elements);
    let dest = path.join(path.resolve("./assets"), lod.mesh);
    let dirname = path.dirname(dest);
    console.log({ dest, dirname });

    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }

    fs.writeFileSync(dest, js2xml(dae, { spaces: '\t' }));

    models[renderable] = {
        mesh: dest,
        subMeshMap: lod.subMeshMap,
        subMeshList: lod.subMeshList,
    }

    // break;
}

fs.writeFileSync("./assets/models.json", JSON.stringify(models, null, '\t'));

let textures = new Set(
    Object.values(models)
        .flatMap(el => (el.subMeshList ?? Object.values(el.subMeshMap)))
        .flatMap(el => el.textureList)
);

for (let texture of textures) {
    let dest = path.join(path.resolve("./assets"), texture);
    let dirname = path.dirname(dest);

    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }

    fs.copyFileSync(resolvePath(texture), dest);
}
