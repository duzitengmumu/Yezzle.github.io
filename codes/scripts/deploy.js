const fs = require('fs')
const path = require('path')

const TO_DIR = '../../'
const FROM_DIR = '../dist'

const copy = (from, to) => {
    if(exists(from)){
        const resolvedFrom = resolvePath(from)
        const resolvedTo = resolvePath(to)
        console.log({resolvedFrom, resolvedTo})
        const writeStream = fs.createWriteStream(resolvedTo)
        // if(!exists(to)){
        //     fs.createWriteStream()
        // }
        fs.createReadStream(resolvedFrom).pipe(writeStream)
    }
}

const copyFiles = (absfrom, absto) => {
    const files = fs.readdirSync(absfrom)
    files.forEach(f => {
        const fpathFrom = path.resolve(absfrom, f)
        const fpathTo = path.resolve(absto, f)
        if( fs.statSync(fpathFrom).isFile() ){
            if(!fs.existsSync(absto)) fs.mkdirSync(absto, {recursive: true}) 
            copy(fpathFrom, fpathTo)
        }else{
            const rltpathTo = path.resolve(absto, path.relative(absfrom, fpathFrom))
            copyFiles(fpathFrom, rltpathTo)
        }
    });
}

function exists(path) {
    return fs.existsSync( resolvePath(path) )
}

function resolvePath(fpath) {
    let result = ''
    if(new RegExp('^.{1,2}\/').test(fpath)){
        result = path.resolve(__dirname, fpath)
    }else{
        result = fpath;
    }

    return result
}

function start(){
    const absFrom = resolvePath(FROM_DIR)
    const absTo = resolvePath(TO_DIR)
    copyFiles(absFrom, absTo)
}

start()