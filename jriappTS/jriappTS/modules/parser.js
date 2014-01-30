var RIAPP;
(function (RIAPP) {
    (function (MOD) {
        (function (parser) {
            var utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });

            var Parser = (function () {
                function Parser() {
                }
                Parser.prototype._getPathParts = function (path) {
                    var self = this, parts = (!path) ? [] : path.split('.'), parts2 = [];
                    parts.forEach(function (part) {
                        var matches, obj, index;
                        matches = part.match(Parser.__indexedPropRX);
                        if (!!matches) {
                            obj = matches[1];
                            index = matches[2];
                            parts2.push(obj);
                            parts2.push('[' + index + ']');
                        } else
                            parts2.push(part);
                    });

                    return parts2;
                };
                Parser.prototype._resolveProp = function (obj, prop) {
                    if (!prop)
                        return obj;
                    if (utils.str.startsWith(prop, '[')) {
                        //it is an indexed property, obj must be of collection type
                        prop = this.trimQuotes(this.trimBrackets(prop));
                        if (obj instanceof RIAPP.MOD.collection.BaseDictionary) {
                            return obj.getItemByKey(prop);
                        } else if (obj instanceof RIAPP.MOD.collection.BaseCollection) {
                            return obj.getItemByPos(parseInt(prop, 10));
                        } else if (utils.check.isArray(obj)) {
                            return obj[parseInt(prop, 10)];
                        } else
                            return obj[prop];
                    } else
                        return obj[prop];
                };
                Parser.prototype._setPropertyValue = function (obj, prop, val) {
                    if (utils.str.startsWith(prop, '[')) {
                        prop = this.trimQuotes(this.trimBrackets(prop)); //remove brakets from a string like: [index]
                        if (utils.check.isArray(obj)) {
                            obj[parseInt(prop, 10)] = val;
                        } else
                            obj[prop] = val;
                    } else
                        obj[prop] = val;
                };

                //extract key - value pairs
                Parser.prototype._getKeyVals = function (val) {
                    var i, ch, literal, parts = [], kv = { key: '', val: '' }, isKey = true, bracePart, vd1 = Parser.__valueDelimeter1, vd2 = Parser.__valueDelimeter2, kvd = Parser.__keyValDelimeter;

                    var addNewKeyValPair = function (kv) {
                        if (kv.val) {
                            if (utils.check.isNumeric(kv.val)) {
                                kv.val = Number(kv.val);
                            } else if (utils.check.isBoolString(kv.val)) {
                                kv.val = utils.parseBool(kv.val);
                            }
                        }
                        parts.push(kv);
                    };

                    var checkTokens = function (kv) {
                        //key starts with this like used in binding expressions this.property
                        if (kv.val === '' && utils.str.startsWith(kv.key, 'this.')) {
                            kv.val = kv.key.substr(5); //extract property
                            kv.key = 'targetPath';
                        }
                    };

                    for (i = 0; i < val.length; i += 1) {
                        ch = val.charAt(i);

                        //is this content inside '' or "" ?
                        if (ch == "'" || ch == '"') {
                            if (!literal)
                                literal = ch;
                            else if (literal == ch)
                                literal = null;
                        }

                        //value inside braces
                        if (!literal && ch === "{" && !isKey) {
                            bracePart = val.substr(i);
                            bracePart = this.getBraceParts(bracePart, true)[0];
                            kv.val += bracePart;
                            i += bracePart.length - 1;
                            continue;
                        }

                        if (!literal && ch === kvd) {
                            if (!!kv.key) {
                                addNewKeyValPair(kv);
                                kv = { key: '', val: '' };
                                isKey = true; //currently parsing key value
                            }
                        } else if (!literal && (ch === vd1 || ch === vd2)) {
                            isKey = false; //begin parsing value
                        } else {
                            if (isKey)
                                kv.key += ch;
                            else
                                kv.val += ch;
                        }
                    }

                    if (!!kv.key) {
                        addNewKeyValPair(kv);
                    }

                    parts.forEach(function (kv) {
                        kv.key = utils.str.trim(kv.key);
                        if (utils.check.isString(kv.val))
                            kv.val = utils.str.trim(kv.val);
                        checkTokens(kv);
                    });

                    parts = parts.filter(function (kv) {
                        return kv.val !== '';
                    });
                    return parts;
                };
                Parser.prototype.resolveBindingSource = function (root, srcParts) {
                    if (!root)
                        return undefined;

                    if (srcParts.length === 0) {
                        return root;
                    }

                    if (srcParts.length > 0) {
                        return this.resolveBindingSource(this._resolveProp(root, srcParts[0]), srcParts.slice(1));
                    }

                    throw new Error('Invalid operation');
                };
                Parser.prototype.resolvePath = function (obj, path) {
                    if (!path)
                        return obj;
                    var parts = this._getPathParts(path), res = obj, len = parts.length - 1;
                    for (var i = 0; i < len; i += 1) {
                        res = this._resolveProp(res, parts[i]);
                        if (!res)
                            return undefined;
                    }
                    return this._resolveProp(res, parts[len]);
                };

                //extract top level braces
                Parser.prototype.getBraceParts = function (val, firstOnly) {
                    var i, s = '', ch, literal, cnt = 0, parts = [];

                    for (i = 0; i < val.length; i += 1) {
                        ch = val.charAt(i);

                        //is this content inside '' or "" ?
                        if (ch === "'" || ch === '"') {
                            if (!literal)
                                literal = ch;
                            else if (literal === ch)
                                literal = null;
                        }

                        if (!literal && ch === '{') {
                            cnt += 1;
                            s += ch;
                        } else if (!literal && ch === '}') {
                            cnt -= 1;
                            s += ch;
                            if (cnt === 0) {
                                parts.push(s);
                                s = '';
                                if (firstOnly)
                                    return parts;
                            }
                        } else {
                            if (cnt > 0) {
                                s += ch;
                            }
                        }
                    }

                    return parts;
                };
                Parser.prototype.trimOuterBraces = function (val) {
                    return utils.str.trim(val.replace(Parser.__trimOuterBracesRX, ''));
                };
                Parser.prototype.trimQuotes = function (val) {
                    return utils.str.trim(val.replace(Parser.__trimQuotsRX, ''));
                };
                Parser.prototype.trimBrackets = function (val) {
                    return utils.str.trim(val.replace(Parser.__trimBracketsRX, ''));
                };
                Parser.prototype.isWithOuterBraces = function (str) {
                    return (utils.str.startsWith(str, '{') && utils.str.endsWith(str, '}'));
                };
                Parser.prototype.parseOption = function (part) {
                    var res = {}, self = this;
                    part = utils.str.trim(part);
                    if (self.isWithOuterBraces(part))
                        part = self.trimOuterBraces(part);
                    var kvals = self._getKeyVals(part);
                    kvals.forEach(function (kv) {
                        var isString = utils.check.isString(kv.val);
                        if (isString && self.isWithOuterBraces(kv.val))
                            res[kv.key] = self.parseOption(kv.val);
                        else {
                            if (isString)
                                res[kv.key] = self.trimQuotes(kv.val);
                            else
                                res[kv.key] = kv.val;
                        }
                    });

                    return res;
                };
                Parser.prototype.parseOptions = function (str) {
                    var res = [], self = this;

                    str = utils.str.trim(str);
                    var parts = [str];
                    if (self.isWithOuterBraces(str)) {
                        parts = self.getBraceParts(str, false);
                    }
                    parts.forEach(function (part) {
                        res.push(self.parseOption(part));
                    });

                    return res;
                };
                Parser.prototype.toString = function () {
                    return 'Parser';
                };
                Parser.__trimOuterBracesRX = /^([{]){0,1}|([}]){0,1}$/g;
                Parser.__trimQuotsRX = /^(['"])+|(['"])+$/g;
                Parser.__trimBracketsRX = /^(\[)+|(\])+$/g;
                Parser.__indexedPropRX = /(^\w+)\s*\[\s*['"]?\s*([^'"]+)\s*['",]?\s*\]/i;
                Parser.__valueDelimeter1 = ':';
                Parser.__valueDelimeter2 = '=';
                Parser.__keyValDelimeter = ',';
                return Parser;
            })();
            parser.Parser = Parser;

            RIAPP.global.onModuleLoaded('parser', parser);
        })(MOD.parser || (MOD.parser = {}));
        var parser = MOD.parser;
    })(RIAPP.MOD || (RIAPP.MOD = {}));
    var MOD = RIAPP.MOD;
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=parser.js.map
