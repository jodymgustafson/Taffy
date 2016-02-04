module Angular
{
    "use strict";

    /**
     * Restrict attributes for directives. Can be combined using string concatenation.
     */
    export module Restrict
    {
        export var Attribute = "A";
        export var Class = "C";
        export var Comment = "M";
        export var Element = "E";
    }

    export module Scope
    {
        export var Attribute = "@";
        export var Binding = "=";
        export var Function = "&";
    }
} 