export class story {
    constructor(input, output) {
        this.input = input;
        this.output = output;

        this.objects = {};
        this.actions = {};
    }

    async validatedInput() {
        let action, args;
        
        while (1) {
            const actionString = await this.input();
            [action, ...args] = actionString.split(' ');

            if (action in this.actions) break;
            else {
                this.output.commandError(`${action} is not a known command`);
            }
        }

        return [action, args];
    }

    async act() {
        while (1) {
            const [action, args] = await this.validatedInput();
            const [ok, output] = await this.actions[action]?.(args) ?? [false, null];

            await this.output.addEntry(output);
            
            if (ok) break;
        }
    }
}

export function ok(...args) { return [true, ...args] }
export function failed(...args) { return [false, ...args] }
