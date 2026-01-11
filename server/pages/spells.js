import {getSpells} from "../../client/js/services/spellsService.js";
import {spellCard} from "../../client/js/components/spellCard.js";

export async function renderCharacters() {
    const characters = await getSpells();
    document.getElementById("app").innerHTML = characters
        .map(spellCard)
        .join("");
}

export class renderSpells {
}