import { readFileSync } from 'fs';
import _ from "lodash";
 
const gendiff = (file1, file2) => {
    const keys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));
        
    const result = keys.map((key) => {
        if (!_.has(file1, key)) {
            return ` + ${key} : ${file2[key]}`;
        }
        if (!_.has(file2, key)) {
            return ` - ${key} : ${file1[key]}`;
        }
        if (file1[key] === file2[key]) {
            return `   ${key} : ${file1[key]}`;
        }        
        if (file1[key] !== file2[key]) {
            return [` - ${key} : ${file1[key]}`,
            ` + ${key}: ${file2[key]}`];
        }
    });
    
    return (`{\n ${result.flat().join('\n ')}\n}`);
}; 

export default (filepath1, filepath2) => {
    const file1 = readFileSync(filepath1, 'utf-8');
    const file2 = readFileSync(filepath2, 'utf-8');

    const parseFile1 = JSON.parse(file1);
    const parseFile2 = JSON.parse(file2);

    return gendiff(parseFile1, parseFile2);
};