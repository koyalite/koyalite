#!/usr/bin/env node
import { Command } from "commander";
import { initCommand } from "./commands/init";

const program = new Command();

program.name("koyalite").description("KoyaLite CLI").version("0.1.0");

program
    .command("init")
    .description("Initialize a new KoyaLite project")
    .action(initCommand);

program.parse();
