const resources = {
    en: {
        translation: {
            login: {
                welcome: 'Welcome to Music Manager!',
                name: 'Name',
                surname: 'Surname',
                email: 'Email',
                password: 'Password',
                confirmPassword: 'Confirm password',
                signIn: 'Sign in',
                signUp: 'Sign up',
                forgotPassword: 'Forgot password?',
                dontHaveAccount: "Don't have an account? <0>Sign up!</0>",
                alreadyHaveAccount: 'Already have an account? <0>Sign in!</0>',
                logoutFailed: 'Logout failed',
                signInFailed: 'Sign in failed',
                signUpFailed: 'Sign up failed',
                validation: {
                    nameMinLength:
                        'Name should be at least {{length}} characters long',
                    nameMaxLength:
                        'Name should not be longer than {{length}} characters',
                    surnameMinLength:
                        'Surname should be at least {{length}} characters long',
                    surnameMaxLength:
                        'Surname should not be longer than {{length}} characters',
                    emailMustBeValid: 'Email must be valid',
                    passwordsMustMatch: 'Passwords must match',
                    passwordMinLength:
                        'Password should be at least {{length}} characters long',
                },
            },
            devices: {
                name: 'Name',
                memorySize: 'Memory size',
                addDevice: 'Add a device',
                newDevice: 'New device',
                add: 'Add',
                newFilesToDownload: '{{count}} new files to download',
                fullSynchronizationNeeded: 'Full synchronization needed',
                downloadMissingFiles: 'Download missing files',
                deleteDevice: 'Delete the device',
                newDeviceAdded: 'New device has been added',
                deviceDeleted: 'Device has been deleted',
                deviceDeleteFailed: 'Deleting new device failed',
                addingDeviceFailed: 'Adding new device failed',
                deviceMarkedUpToDate: 'Device has been marked as up to date',
                deviceMarkingUpToDateFailed:
                    'Marking the device as up to date failed',
                markAsUpToDate: 'Mark as up to date',
                isYourDeviceUpToDate:
                    'Downloading the files package is in progress. It contains an executable file. You should use it to update your device manually. Once it\'s done, you should mark your device as up to date. You can do it now by clicking the "Confirm" button, or mark it later by clicking the "Mark as up to date" button in the device panel.',
                validation: {
                    nameMinLength:
                        'Name should be at least {{length}} characters long',
                    nameMaxLength:
                        'Name should not be longer than {{length}} characters',
                    sizeMin: 'Size should be greater than 0',
                },
            },
            files: {
                upload: 'Upload',
                filesUploaded: 'Files have been uploaded',
                uploadFiles: 'Upload files',
                uploadingFilesFailed: 'Uploading file(s) failed',
                dropFilesHere: 'Drop the files here...',
                dropFilesHereOrClickToUpload:
                    'Drop files here or click to upload',
                dropMoreFilesHereOrClickToUpload:
                    'Drop more files here or click to upload',
                numberOfRejectedFiles: 'Number of rejected files: {{count}}',
                parentDirectory: 'Parent directory: {{name}}',
                rootDirectory: 'Root directory',
                showMore: 'Show the remaining {{count}} files',
                showLess: 'Show less',
                directoryIsEmpty: 'The directory is empty',
                createDirectory: 'Create directory',
                directoryCreated: 'Directory has been created',
                creatingDirectoryFailed: 'Creating directory failed',
                create: 'Create',
                name: 'Name',
                newFolder: 'New Folder',
                directoryDeleted: 'The directory has been deleted',
                fileDeleted: 'The file has been deleted',
                deletingDirectoryFailed: 'Deleting the directory failed',
                deletingFileFailed: 'Deleting the file failed',
                directoryUpdated: 'The directory has been updated',
                fileUpdated: 'The file has been updated',
                updatingDirectoryFailed: 'Updating the directory failed',
                updatingFileFailed: 'Updating the file failed',
                validation: {
                    nameMinLength:
                        'Name should be at least {{length}} characters long',
                    nameMaxLength:
                        'Name should not be longer than {{length}} characters',
                },
            },
            loading: 'Loading...',
            fieldRequired: 'The field is required',
            MB: 'MB',
            cancel: 'Cancel',
            confirm: 'Confirm',
            areYouSure: 'Are you sure?',
        },
    },
    pl: {
        translation: {
            login: {
                welcome: 'Witamy w Menedżerze Muzyki!',
                name: 'Imię',
                surname: 'Nazwisko',
                email: 'Email',
                password: 'Hasło',
                confirmPassword: 'Powtórz hasło',
                signIn: 'Zaloguj się',
                signUp: 'Załóż konto',
                forgotPassword: 'Zapomniałeś hasła?',
                dontHaveAccount: 'Nie masz konta? <0>Zarejestruj się!</0>',
                alreadyHaveAccount: 'Masz juz konto? <0>Zaloguj się!</0>',
                logoutFailed: 'Wylogowanie zakończone niepowodzeniem',
                signInFailed: 'Logowanie zakończona niepowodzeniem',
                signUpFailed: 'Rejestracja zakończona niepowodzeniem',
                validation: {
                    nameMinLength:
                        'Imię powinno mieć co najmniej {{length}} znaki',
                    nameMaxLength:
                        'Imię nie powinno mieć więcej niż {{length}} znaków',
                    surnameMinLength:
                        'Nazwisko powinno mieć co najmniej {{length}} znaki',
                    surnameMaxLength:
                        'Nazwisko nie powinno mieć więcej niż {{length}} znaków',
                    emailMustBeValid: 'Email musi być prawidłowy',
                    passwordsMustMatch: 'Hasła muszą być takie same',
                    passwordMinLength:
                        'Hasło powinno mieć co najmniej {{length}} znaków',
                },
            },
            devices: {
                name: 'Nazwa',
                memorySize: 'Rozmiar pamięci',
                addDevice: 'Dodaj urządzenie',
                newDevice: 'Nowe urządzenie',
                add: 'Dodaj',
                newFilesToDownload: '{{count}} nowych plików do pobrania',
                fullSynchronizationNeeded: 'Wymagana pełna synchronizacja',
                downloadMissingFiles: 'Pobierz brakujące pliki',
                deleteDevice: 'Usuń urządzenie',
                newDeviceAdded: 'Dodano nowe urządzenie',
                deviceDeleted: 'Urządzenie usunięte',
                deviceDeleteFailed:
                    'Usuwanie urządzenia zakończone niepowodzeniem',
                addingDeviceFailed:
                    'Dodawanie nowego urządzenia zakończone niepowodzeniem',
                deviceMarkedUpToDate: 'Urządzenie oznaczone jako aktualne',
                deviceMarkingUpToDateFailed:
                    'Oznaczanie urządzenia jako aktualne zakończone niepowodzeniem',
                markAsUpToDate: 'Oznacz jako aktualne',
                isYourDeviceUpToDate:
                    'Trwa pobieranie pakietu plików. Pakiet zawiera plik wykonywalny. Powinieneś go użyć do ręcznej aktualizacji urządzenia. Po zakończeniu oznacz swoje urządzenie jako aktualne. Możesz to zrobić teraz, klikając przycisk „Potwierdź”, lub później, klikając przycisk „Oznacz jako aktualne” w panelu urządzenia.',
                validation: {
                    nameMinLength:
                        'Nazwa powinna mieć co najmniej {{length}} znaki',
                    nameMaxLength:
                        'Nazwa nie powinna mieć więcej niż {{length}} znaków',
                    sizeMin: 'Rozmiar powinien być większy niż 0',
                },
            },
            files: {
                upload: 'Upload',
                filesUploaded: 'Przesłano pliki',
                uploadFiles: 'Prześlij pliki',
                uploadingFilesFailed:
                    'Przesyłanie plików zakończone niepowodzeniem',
                dropFilesHere: 'Upuść pliki tutaj...',
                dropFilesHereOrClickToUpload:
                    'Upuść pliki tutaj lub kliknij, aby przesłać',
                dropMoreFilesHereOrClickToUpload:
                    'Upuść więcej plików tutaj lub kliknij, aby przesłać',
                numberOfRejectedFiles: 'Liczba odrzuconych plików: {{count}}',
                parentDirectory: 'Katalog nadrzędny: {{name}}',
                rootDirectory: 'Główny katalog',
                showMore: 'Pokaż pozostałe {{count}} plików',
                showLess: 'Pokaż mniej',
                directoryIsEmpty: 'Katalog jest pusty',
                createDirectory: 'Stwórz katalog',
                directoryCreated: 'Katalog został stworzony',
                creatingDirectoryFailed:
                    'Tworzenie katalogu zakończone niepowodzeniem',
                create: 'Stwórz',
                name: 'Nazwa',
                newFolder: 'Nowy Folder',
                directoryDeleted: 'Katalog został usunięty',
                fileDeleted: 'Plik został usunięty',
                deletingDirectoryFailed:
                    'Usuwanie katalogu zakończone niepowodzeniem',
                deletingFileFailed: 'Usuwanie pliku zakończone niepowodzeniem',
                directoryUpdated: 'Katalog został zaktualizowany',
                fileUpdated: 'Plik został zaktualizowany',
                updatingDirectoryFailed:
                    'Aktualizowanie katalogu zakończone niepowodzeniem',
                updatingFileFailed:
                    'Aktualizowanie pliku zakończone niepowodzeniem',
                validation: {
                    nameMinLength:
                        'Nazwa powinna mieć co najmniej {{length}} znaki',
                    nameMaxLength:
                        'Nazwa nie powinna mieć więcej niż {{length}} znaków',
                },
            },
            loading: 'Ładowanie...',
            fieldRequired: 'Pole jest wymagane',
            MB: 'MB',
            cancel: 'Anuluj',
            confirm: 'Potwierdź',
            areYouSure: 'Jesteś pewien?',
        },
    },
};

export default resources;
