import { getFile } from "./common.js";

function dotViewer(file) {
    getFile(file).then(function (response) {
        d3.select("#virginia-content")
            .graphviz()
            .attributer(function (d) {
                if (d.tag === "a") {
                    const url = new URL(
                        d.attributes["xlink:href"],
                        window.location.href
                    );
                    //const url = d.attributes["xlink:href"];
                    const searchParams = new URLSearchParams(url.search);
                    searchParams.set("redirectUrl", window.location.href);
                    url.search = searchParams;
                    console.log(d);
                    console.log(url);
                    d3.select(this).attr("href", "yellow");
                    d.attributes["xlink:href"] = url;
                }
            })
            .renderDot(response.data);
    });
}
function txtViewer(file) {
    getFile(file).then(function (response) {
        document.getElementById(
            "virginia-content"
        ).innerHTML = `<pre>${response.data}</pre>`;
    });
}
function mdViewer(file) {
    getFile(file).then(function (response) {
        document.getElementById("virginia-content").innerHTML = marked.parse(
            response.data
        );
    });
}
function jsonViewer(file, searchParams) {
    const container = document.getElementById("virginia-content");
    getFile(file, {
        transformResponse: (res) => {
            return res;
        },
        responseType: "json",
    }).then(function (response) {
        const moduleUrl = searchParams.get("module");
        if (moduleUrl !== null) {
            import(moduleUrl).then(function (module) {
                const reviver = searchParams.get("reviver") ?? "reviver";
                const object = JSON.parse(response.data, module[reviver]);
                return object.render(container);
            });
        } else {
            console.log(response.data);
            container.innerHTML = `<pre>${JSON.stringify(response.data)}</pre>`;
        }
    });
}
function main() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(window.location.search);
    const file = searchParams.get("file") ?? index.md;
    const handlers = new Map([
        ["dot", dotViewer],
        ["txt", txtViewer],
        ["json", jsonViewer],
        ["md", mdViewer],
    ]);
    const extension = file.split(".").pop();
    handlers.get(extension)(file, searchParams);
}

export { main };
