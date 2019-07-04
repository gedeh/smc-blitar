import logger from "@utils/create-logger"
import fs from "fs"
import path from "path"
import { join } from "path"

const copyFilesIfDestinationIsEmpty = ( from, destination, replace ) => {

    const fromName = path.basename( from )
    if (!fs.existsSync( destination )) fs.mkdirSync( destination, { recursive: true } )

    fs.readdir( destination, {}, ( err, data ) => {

        if (err) {
            logger.err( `Unable to read directory "${ destination }": ${err}` )
            return
        }

        logger.info( `Files in destination "${ destination }": ${ data ? data.length : 0 }` )
        if (data && ( data.length === 0 || replace )) {

            fs.readdir( from, ( err, originals ) => {

                if (err) {
                    logger.err( `Unable to read original directory "${ fromName }": ${err}` )
                    return
                }

                if (originals.length) {
                    originals.forEach( original => {

                        const fromPath = join( from, original )
                        const toPath = join( destination, original )
                        const fromDir = path.basename( path.dirname( fromPath ) )

                        const isDirectory = fs.statSync( fromPath ).isDirectory()
                        if (isDirectory) {

                            logger.info( `Original file "${ original }" is directory. Creating copy in destination` )
                            if (!fs.existsSync( toPath )) fs.mkdirSync( toPath )
                            copyFilesIfDestinationIsEmpty( fromPath, toPath, replace )

                        }
                        else {

                            logger.info( `Copy original file "${ fromDir }/${ original }"` )
                            fs.copyFile( fromPath, toPath, err => {

                                if (err) logger.error( `Failure copying "${original}": ${ err }` )

                            } )

                        }

                    } )
                }

            } )

        }

    })

}

export default copyFilesIfDestinationIsEmpty
