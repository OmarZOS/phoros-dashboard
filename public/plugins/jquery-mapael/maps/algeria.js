/*!
 *
 * Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
 * Requires jQuery and Mapael
 *
 * Map of USA by state
 *
 * @source http://the55.net/_11/sketch/us_map
 *
 * @deprecated : this map will be definitely moved to 'mapael-maps' repository starting from the next major release (3.0.0).
 * You can use instead https://github.com/neveldo/mapael-maps/blob/master/usa/usa_state.js
 */
(function (factory) {
    if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('jquery'), require('jquery-mapael'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'mapael'], factory);
    } else {
        // Browser globals
        factory(jQuery, jQuery.mapael);
    }
}(function ($, Mapael) {

    "use strict";

    $.extend(true, Mapael,
        {
            maps :{
                algeria : {
                    width : 959,
                    height : 593,
                    latLngToGrid: function(lat, lng, phi1, phi2, midLng, scale) {
                        var pi =Math.PI;
                        var midLat = (phi1 + phi2) / 2;
                        var n, tmp1, tmp2, tmp3, x, y, p;

                        n = (Math.sin(phi1 / 180 * pi) + Math.sin(phi2 / 180 * pi)) / 2;
                        tmp1 = Math.sqrt(Math.cos(phi1 / 180 * pi)) + 2 * n * Math.sin(phi1 / 180 * pi);
                        tmp2 = scale * Math.pow(tmp1 - 2 * n * Math.sin(midLat / 180 * pi),0.5) / n;
                        tmp3 = n * (lng - midLng);
                        p = scale * Math.pow(tmp1 - 2 * n * Math.sin(lat / 180 * pi),0.5) / n;
                        x = p * Math.sin(tmp3 / 180 * pi);
                        y = tmp2 - p * Math.cos(tmp3 / 180 * pi);

                        return([x,y]);
                    },
                    getCoords : function (lat, lon) {
                        var coords = {},
                            xOffset,
                            yOffset,
                            scaleX,
                            scaleY,
                            phi1,
                            phi2,
                            midLng,
                            scale;
                        if(lat > 51) { // alaska
                            phi1= 15;
                            phi2= 105;
                            midLng = -134;
                            scale = 530;
                            coords = this.latLngToGrid(lat, lon, phi1, phi2, midLng, scale);
                            xOffset = 190;
                            yOffset = 543;
                            scaleX= 1;
                            scaleY= -1;

                        } else if (lon < -140) { // hawaii
                            phi1= 0;
                            phi2= 26;
                            midLng = -166;
                            scale = 1280;
                            coords = this.latLngToGrid(lat, lon, phi1, phi2, midLng, scale);
                            xOffset = 115;
                            yOffset = 723;
                            scaleX= 1;
                            scaleY= -1;
                        } else {
                            xOffset = -17;
                            yOffset = -22;
                            scaleX = 10.05;
                            scaleY = 6.26;

                            coords[0] = 50.0 + 124.03149777329222 * ((1.9694462586094064-(lat* Math.PI / 180)) * Math.sin(0.6010514667026994 * (lon + 96) * Math.PI / 180));
                            coords[1] = 50.0 + 1.6155950752393982 * 124.03149777329222 * 0.02613325650382181 - 1.6155950752393982* 124.03149777329222 * (1.3236744353715044- (1.9694462586094064-(lat* Math.PI / 180)) * Math.cos(0.6010514667026994 * (lon + 96) * Math.PI / 180));
                        }
                        return {x : (coords[0] * scaleX + xOffset), y : (coords[1] * scaleY + yOffset)};
                    },
                    elems : {
                     }
                }
            }
        }
    );

    return Mapael;

}));
