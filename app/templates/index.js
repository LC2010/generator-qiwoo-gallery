/**
 * @fileoverview <%= prodesc%>
 * @author <%= author%> <<%= email%>>
 * @module <%= proname%>
 **/
(function(define, global) { 'use strict';
    define(function (require) {
        // 请填写组件内容
        
    });
}) (
    typeof define === 'function' && define.amd ? define : function (factory) { 
        if(typeof module != 'undefined'){
            module.exports = factory(require); 
        }else if(typeof window != 'undefined'){
            window.<%= proname%> = factory();
        }
    },
    this
);
