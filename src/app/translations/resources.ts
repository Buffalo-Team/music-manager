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
                downloadMissingFiles: 'Download missing files',
                deleteDevice: 'Delete the device',
                validation: {
                    nameMinLength:
                        'Name should be at least {{length}} characters long',
                    nameMaxLength:
                        'Name should not be longer than {{length}} characters',
                    sizeMin: 'Size should be greater than 0',
                },
            },
            loading: 'Loading...',
            fieldRequired: 'The field is required',
            MB: 'MB',
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
                downloadMissingFiles: 'Pobierz brakujące pliki',
                deleteDevice: 'Usuń urządzenie',
                validation: {
                    nameMinLength:
                        'Nazwa powinna mieć co najmniej {{length}} znaki',
                    nameMaxLength:
                        'Nazwa nie powinna mieć więcej niż {{length}} znaków',
                    sizeMin: 'Rozmiar powinien być większy niż 0',
                },
            },
            loading: 'Ładowanie...',
            fieldRequired: 'Pole jest wymagane',
            MB: 'MB',
        },
    },
};

export default resources;
