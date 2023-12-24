import { getSiteConfig } from './site-helper'
const fs = require('fs');
const path = require('path');

let SiteConfig = getSiteConfig();

export async function getProjectNames() {
    if (!SiteConfig) {
        return []
    }
    const projects = SiteConfig.projects
    const projectNames = projects.map(project => project.name)
    return projectNames
}

export async function getVersions(projectName, isPreview) {
    const url = "_docs/" + projectNameToProjectID(projectName) + getPreviewPrefix(isPreview) + '/versions.json'
    const filePath = path.resolve("./public", "..", url)
    console.log("[Spreading][getVersions] filePath: ", filePath)
    if (!fs.existsSync(filePath)) {
        return []
    }
    try {
        const versions = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        return versions;
    } catch (e) {
        console.log("[Spreading][getVersions] ERROR: ", e)
        return []
    }
}

export async function getStructure(projectName, version, isPreview) {
    const url = "_docs/" + projectNameToProjectID(projectName) + getPreviewPrefix(isPreview) + '/' + version + '/structure.json'
    const filePath = path.resolve("./public", "..", url)
    console.log("[Spreading][getStructure] filePath: ", filePath)
    if (!fs.existsSync(filePath)) {
        return undefined
    }
    try {
        const structure = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        return structure;
    } catch (e) {
        console.log("[Spreading][getStructure] ERROR: ", e)
        return undefined
    }
}

export function getMdxContent(projectName, version, fileName, isPreview) {
    if (isMdxExist(projectName, version, fileName, isPreview) === false) {
        return ""
    }
    const url = "_docs/" + projectNameToProjectID(projectName) + getPreviewPrefix(isPreview) + '/' + version + "/docs/" + fileName + ".mdx"
    console.log("[Spreading][getMdxContent] URL: ", url)
    try {
        const content = fs.readFileSync(path.resolve("./public", "..", url), 'utf8')
        return content;
    } catch (e) {
        console.log("[Spreading][getMdxContent] ERROR: ", e)
        return ""
    }
}

export function isMdxExist(projectName, version, fileName, isPreview) {
    const url = "_docs/" + projectNameToProjectID(projectName) + getPreviewPrefix(isPreview) + '/' + version + "/docs/" + fileName + ".mdx"
    console.log("[Spreading][isMdxEsist] URL: ", url)
    try {
        const isExist = fs.existsSync(path.resolve("./public", "..", url))
        return isExist;
    } catch (e) {
        console.log("[Spreading][isMdxEsist] ERROR: ", e)
        return false
    }
}

function projectNameToProjectID(projectName) {
    const projects = SiteConfig.projects
    for (const project of projects) {
        if (project.name === projectName) {
            return project.id
        }
    }
    return ""
}

function getPreviewPrefix(isPreview) {
    return isPreview ? "/preview" : "/public"
}