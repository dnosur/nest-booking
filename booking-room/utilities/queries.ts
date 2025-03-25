import { isNull } from 'lodash';

export function limitOffset(options: {
    limit?: number;
    offset?: number;
    desc?: boolean;
}): string {
    return (!isNull(options.limit) && !isNull(options.offset)) && 
    !isNaN(options.limit) && !isNaN(options.offset)
        ? `LIMIT ${options.limit} OFFSET ${options.offset};`
        : '';
};