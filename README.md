# json-string-parser
This module allow string modification with by specifying the given JSON rules

## Installation
*Coming soon*

## Usage
*Coming soon*

## Available Rules

### Trim
Remove space on the beginning and the end of a string.

**JSON data:**
```json
{
    "type": "trim"
}
```

**Usage:**
```javascript
var input = " text with spaces ";
var rules = [{
    "type": "trim",
}];
var result = jsonStringParse(input, rules);
console.log(result); // Result: "text with spaces"
```


### Split
Split a text into array with given delimiter

**JSON data:**
```json
{
    "type": "split",
    "value": ","
}
```

**Usage:**
```javascript
var input = "1,2";
var rules = [{
    "type": "split",
    "value": ","
}];
var result = jsonStringParse(input, rules);
console.log(result); // Result: array with values [1,2]
```


### Join
Combine array into text with given glue into string

**JSON data:**
```json
{
    "type": "join",
    "value": ","
}
```

**Usage:**
```javascript
var input = [1, 2];
var rules = [{
    "type": "join",
    "value": ","
}];
var result = jsonStringParse(input, rules);
console.log(result); // Result: "1,2"
```

