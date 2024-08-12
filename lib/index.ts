import { 
    Command, 
    CommandList, 
    CommandMiddleware,
    Component, 
    ComponentList, 
    Event 
} from "./types";
import { ClientEvents } from "discord.js";

import * as client from "./client";
import * as handlers from "./handlers";
import * as message from "./message";
import * as utils from "./utils";

export default {
    commands: {
        chat: new Map<string, Command>(),
        user: new Map<string, Command>(),
        message: new Map<string, Command>()
    } as CommandList,
    components: {
        button: new Map<string, Component>()
    } as ComponentList,
    events: new Map<string, Event<keyof ClientEvents>>(),
    middleware: [] as CommandMiddleware[],
    categories: new Set<string>(),
    ...client,
    ...handlers,
    ...message,
    ...utils
};