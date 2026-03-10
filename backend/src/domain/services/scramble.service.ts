import { Injectable } from "@nestjs/common";

@Injectable()
export class ScrambleService {
    scramble(text: string) {
        const arr = text.split("");
        for(let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join("");
    }
}