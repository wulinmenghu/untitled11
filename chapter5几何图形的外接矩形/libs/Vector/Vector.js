﻿//CLASS:矢量图形类
function Vector(geometry, style, attributes) {
    this.id = CanvasSketch.getId("vector");
    this.geometry = geometry;
	this.style = style;
    if(attributes) {
        this.attributes = attributes;
    }
}