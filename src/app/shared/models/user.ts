import { SafeHtml } from '@angular/platform-browser';

export class User {
    id: string;
    crated_time: number;
    created: string;
    karma: number;
    avg: number;
    about: string | SafeHtml;
}
