import RSVP from 'rsvp';
import Service from '@ember/service';
import config from 'ember-get-config';

const MAPS_API_KEY = config['ember-google-charts'] ? config['ember-google-charts'].mapsApiKey : null;

export default Service.extend({
  language: 'en',

  init() {
    this._super(...arguments);

    this.googlePackages = this.googlePackages || ['corechart', 'bar', 'line', 'scatter', 'geochart'];
    this.defaultOptions = this.defaultOptions || {
      animation: {
        duration: 500,
        startup: false,
      },
    };
  },

  loadPackages() {
    const {
      google: {
        charts,
        visualization
      }
    } = window;

    return new RSVP.Promise((resolve, reject) => {
      if (visualization !== undefined) {
        resolve();
      } else {
        google.charts.load('current', {
          packages: this.googlePackages,
          mapsApiKey: MAPS_API_KEY,
        });

        charts.setOnLoadCallback((ex) => {
          if (ex) {
            reject(ex);
          }

          resolve();
        });
      }
    });
  },
});