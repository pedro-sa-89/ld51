import { story, ok, failed } from './story.mjs';

export class mainStory extends story {
    async tell() {
        this.objects = {
            "door": {}
        };
        
        this.actions.open = ([what]) => {
            if (what in this.objects) {
                return ok(`you open the ${what}. ${this.actions.open.nextRoom ?? ""}`)
            }
            else {
                return failed(`didn't find any ${what} to open`);
            }
        }
    
        this.actions.open.nextRoom = "the room is bright.";
    
        await this.act();
    
        delete this.actions.open.nextRoom;
    
        await this.act();
    
    }
}

export default mainStory;
