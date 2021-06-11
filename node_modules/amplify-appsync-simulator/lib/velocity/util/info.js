"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInfo = void 0;
var printer_1 = require("graphql/language/printer");
function createInfo(info) {
    var getSelectionSet = function (nodes, prefix) {
        if (prefix === void 0) { prefix = null; }
        return nodes.reduce(function (selectionSetList, node) {
            if (node.kind == 'Field') {
                var aliasOrName = (node.alias || node.name).value;
                var name = prefix ? prefix + "/" + aliasOrName : aliasOrName;
                selectionSetList.push(name);
                if (node.selectionSet) {
                    selectionSetList.push.apply(selectionSetList, getSelectionSet(node.selectionSet.selections, name));
                }
            }
            else if (node.kind === 'InlineFragment' || node.kind === 'FragmentSpread') {
                var fragment = node.kind === 'FragmentSpread' ? info.fragments[node.name.value] : node;
                if (fragment && fragment.selectionSet) {
                    selectionSetList.push.apply(selectionSetList, getSelectionSet(fragment.selectionSet.selections, prefix));
                }
            }
            return selectionSetList;
        }, []);
    };
    var selectionSetGraphQL = '';
    var selectionSetList = [];
    var fieldNode = info.fieldNodes.find(function (f) { return f.name.value === info.fieldName; });
    if (fieldNode && fieldNode.selectionSet) {
        selectionSetGraphQL = printer_1.print(fieldNode.selectionSet);
        selectionSetList = getSelectionSet(fieldNode.selectionSet.selections);
    }
    return {
        fieldName: info.fieldName,
        variables: info.variableValues,
        parentTypeName: info.parentType,
        selectionSetList: selectionSetList,
        selectionSetGraphQL: selectionSetGraphQL,
    };
}
exports.createInfo = createInfo;
//# sourceMappingURL=info.js.map