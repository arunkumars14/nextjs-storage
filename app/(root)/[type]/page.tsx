import Card from '@/components/Card';
import Sort from '@/components/Sort';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';
import { convertFileSize, getFileTypesParams } from '@/lib/utils';
import { Models } from 'node-appwrite';
import React from 'react'

const page = async ({ params, searchParams }: SearchParamProps) => {

    const type = (await params)?.type as string || "";
    const searchText = (await searchParams)?.query as string || "";
    const sort = (await searchParams)?.sort as string || "$createdAt-desc";

    const types = getFileTypesParams(type) as FileType[]

    const files = await getFiles({types, searchText, sort})

    const totalSpace = await getTotalSpaceUsed()

    let size: string = "";

    switch (type) {
        case "documents":
            size = convertFileSize(totalSpace.document.size);
            break;
        case "images":
            size = convertFileSize(totalSpace.image.size);
            break;
        case "media":
            size = convertFileSize(totalSpace.video.size + totalSpace.audio.size);
            break;
        case "others":
            size = convertFileSize(totalSpace.other.size);
            break;  
        default:
            break;
    }


    return (
        <div className='page-container'>
            <section className="w-full ">
                <h1 className="h1 capitalize">{type}</h1>

                <div className="total-size-section">
                    <p className="body-1">
                        Total: <span className="h5">
                            {size}
                        </span>
                    </p>

                    <div className="sort-container">
                        <p className="body-1 hidden sm:block text-light-200">
                            Sort by:
                        </p>

                        <Sort />
                    </div>
                </div>
            </section>

            {files.total > 0 ? (
                <section className="file-list">
                    {files.documents.map((file: Models.Document) => (
                        <Card key={file.$id} file={file}/>
                    ))}
                </section>
            ): (
                <p className="empty-list">No files uploaded</p>
            )}

            
        </div>
    )
}

export default page