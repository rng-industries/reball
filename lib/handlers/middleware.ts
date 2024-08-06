import { ChatInputCommandMiddleware, Command, CommandMiddleware, MessageContextMenuCommandMiddleware, SlashCommandInteraction, SlashCommandMiddleware, UserContextMenuCommandMiddleware } from "../types";
 
export function use(middleware_fn: CommandMiddleware) {
    this.middleware.push(middleware_fn);
}

export function handle_middleware(interaction: SlashCommandInteraction, command?: Command) {
    let middlewares: CommandMiddleware[];
    if (command)
        middlewares = command.middleware;
    else 
        middlewares = this.middleware;
    let step = 0;

    function next() {
        step++;
        
        if (step < middlewares.length)
            run_middleware(interaction, middlewares[step] as CommandMiddleware, next);
    }

    if (middlewares.length !== 0)
        run_middleware(interaction, middlewares[step] as CommandMiddleware, next);
}

function run_middleware(interaction: SlashCommandInteraction, middleware: CommandMiddleware, next: () => void) {
    switch (interaction.commandType) {
        case 1:    
            (middleware as ChatInputCommandMiddleware)(interaction, next);
            break;
        case 2:
            (middleware as UserContextMenuCommandMiddleware)(interaction, next);
            break;
        case 3:
            (middleware as MessageContextMenuCommandMiddleware)(interaction, next);
            break;
        default:
            (middleware as SlashCommandMiddleware)(interaction, next);
            break;
    };
}