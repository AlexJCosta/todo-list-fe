export class Auth {
    id: string;
    token: string;

    constructor(id: string, at: string) {
        this.id = id;
        this.token = at;
    }
} 