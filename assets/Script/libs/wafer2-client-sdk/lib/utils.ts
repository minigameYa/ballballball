
/**
 * 拓展对象
 */
export default {
    extend: function extend(target, ...rests) {
        var sources = rests
    
        for (var i = 0; i < sources.length; i += 1) {
            var source = sources[i];
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
    
        return target;
    }
}