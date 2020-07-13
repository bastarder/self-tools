function isArray(i) {
    return Object.prototype.toString.call(i) === "[object Array]";
}

function appendChild(item, child, key = "children") {
    if (isArray(item[key])) {
        item[key].push(child);
    } else {
        item[key] = [child];
    }
}

export default function listToTree(
    _list = [],
    rootValue,
    idKey,
    parentIdKey,
    childrenKeyString = "children"
) {
    const list = [..._list];
    const pool = {};
    const rootItems = [];

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const id = item[idKey];
        const parentId = item[parentIdKey];

        if (!parentId || parentId === rootValue) {
            rootItems.push(item);
        }

        if (!pool[parentId]) {
            pool[parentId] = [item];
        } else {
            if (isArray(pool[parentId])) {
                pool[parentId].push(item);
            } else {
                appendChild(pool[parentId], item, childrenKeyString);
            }
        }

        if (!pool[id]) {
            pool[id] = item;
        } else {
            if (isArray(pool[id])) {
                item[childrenKeyString] = pool[id];
                pool[id] = item;
            } else {
                appendChild(pool[id], item, childrenKeyString);
                pool[id][childrenKeyString].push(item);
            }
        }
    }

    return rootItems;
}