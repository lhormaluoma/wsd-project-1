import * as itemService from "../services/itemService.js";

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const createItem = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await itemService.createItem(urlParts[2], name);

    return redirectTo(`/lists/${urlParts[2]}`);
};

const finishItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await itemService.finishItem(urlParts[4]);
  
    return redirectTo(`/lists/${urlParts[2]}`);
  };

export { createItem, finishItem };