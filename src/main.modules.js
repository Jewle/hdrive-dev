import {Module} from "./core/Module";
import {Menu} from "./components/menu/Menu";
import {Main} from "./components/main/Main";
import {Folders} from "./components/folders/Folders";
import {Start} from "./components/start/Start";
import {Uploader} from "./components/uploader/Uploader";
import {Search} from "./components/search/Search";
import {Item} from "./components/item/Item";
import {Paginator} from "./components/paginator/Paginator";
import {Selection} from "./components/selection/Selection";
import Register from "./components/register/Register";





export const modules = {
    'drive':new Module({
        components: [
            {mainComponent:Menu,child:Paginator},
            {mainComponent:Main,child:Search},
            Selection,
            Uploader,
            Folders,
        ],
    }),
    'hello':new Module({components: [Start,Register]}),
    'system':new Module({components:[Item]})
}


