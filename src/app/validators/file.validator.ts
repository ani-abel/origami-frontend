import { AbstractControl } from "@angular/forms";
import { Observable, of, Observer } from "rxjs";

//function to be used for validating file types asyncroniously
//validates files based on their blob types
export const MimeTypeValidator = (control: AbstractControl): Promise<{[key: string]: boolean}> | Observable<{[key:string]: boolean}> => {
    //make type that only files with input type 'file' as validated
    if(typeof(control.value) === "string"){
        return of(null);//returns an observable of type 'null'
    }
    const file: File = (control.value as File);
    const fileReader = new FileReader();

    const fileObs = Observable.create((observer: Observer<{[key: string]: boolean}>) => {
        fileReader.addEventListener("onloadend", () => {//delay file validation till the file completes loading
            //this method readsthe inner metadata of a file and validates against it
            const arr = new Uint8Array((fileReader.result as ArrayBuffer)).subarray(0, 4);

            let header: string = "";
            let isValid: boolean = false;

            for(let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);//read the characters that make up the file extension and store for validation
            }

            switch(header) {
                case "89504e47":
                    isValid = true;
                    break;
                case "ffd8ffe0"://This codes stand for .jpg, and .png filetypes
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                    isValid = true;
                    break;
                default:
                    isValid = false; // Or you can use the blob.type as fallback
                    break;
            }

            observer.next((!isValid ? { invalidMimeType: true } : null));

            //complete the observable lifecycle
            observer.complete();
        });

        fileReader.readAsArrayBuffer(file);
    });

    return fileObs;
};

export const FileSizeValidator = (control: AbstractControl): Observable<{[key: string]: boolean}> | Promise<{[key: string]: boolean}> => {
    if(typeof(control.value) === "string"){
        return of(null);
    }

    const sizeObs = Observable.create((observer: Observer<{[key: string]: boolean}>) => {
        const file: File = (control.value as File);

        observer.next((file.size > 300000 ? { exceedsFileSize: true } : null));

        //complete the observerable lifecycle
        observer.complete();
    });

    return sizeObs;
};
