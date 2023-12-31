import { configure, renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

configure({
    views: `${Deno.cwd()}/views/`,
  });

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return redirectTo("/lists");
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    list: await listService.findById(urlParts[2]),
    items: await itemService.findAllItemsByList(urlParts[2]),
  };
  
  return new Response(await renderFile("list.eta", data), responseDetails);
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.findAllNonCompletedLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewIndex = async () => {
    const data = {
        count: await listService.countAllLists(),
        countItems: await itemService.countAllItems(),
    };
    return new Response(await renderFile("index.eta", data), responseDetails);
    }

const completeList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    
    await listService.completeById(urlParts[2]);
    
    return redirectTo("/lists");
    }

export { addList, viewList, viewLists, completeList, viewIndex };