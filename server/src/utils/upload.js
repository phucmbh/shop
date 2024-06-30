const { IncomingForm } = require('formidable');
const fs = require('fs');
const shelljs = require('shelljs');
const mv = require('mv');
const { ErrorHandler } = require('./response');
const { STATUS } = require('../constants/status');
const { isEmpty } = require('lodash');
const { uuidv4 } = require('uuid').v4;
const { FOLDER_UPLOAD } = require('../constants/config');

const getExtension = (filename) => /(?:\.([^.]+))?$/.exec(filename)[1];

const upload = (image, folder) => {
  return new Promise((resolve, reject) => {
    const dir = `${FOLDER_UPLOAD}${folder ? '/' + folder : ''}`;
    if (!fs.existsSync(dir)) {
      shelljs.mkdir('-p', dir);
    }
    const tmpPath = image.path;
    const newName = uuidv4() + '.' + getExtension(image.name);
    const newPath = dir + '/' + newName;
    mv(tmpPath, newPath, function (err) {
      if (err)
        return reject(
          new ErrorHandler(STATUS.INTERNAL_SERVER_ERROR, 'Lỗi đổi tên file')
        );
      resolve(newName);
    });
  });
};

const uploadFile = (req, folder = '') => {
  return (
    new Promise() <
    string >
    ((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, function (error, fields, files) {
        if (error) {
          return reject(error);
        }
        try {
          const { image } = files;
          const errorEntity = {};
          if (!image) {
            errorEntity.image = 'Không tìm thấy image';
          } else if (!image.type.includes('image')) {
            errorEntity.image = 'image không đúng định dạng';
          }
          if (!isEmpty(errorEntity)) {
            return reject(
              new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, errorEntity)
            );
          }
          upload(image, folder)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        } catch (err) {
          reject(err);
        }
      });
    })
  );
};

const uploadManyFile = (req, folder = '') => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, function (error, fields, files) {
      if (error) {
        return reject(error);
      }
      try {
        const { images } = files;
        const errorEntity = {};
        if (!images) {
          errorEntity.image = 'Không tìm thấy images';
        } else if (images.some((image) => !image.type.includes('image'))) {
          errorEntity.image = 'image không đúng định dạng';
        }
        if (!isEmpty(errorEntity)) {
          return reject(
            new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, errorEntity)
          );
        }
        const chainUpload = images.map((image) => {
          return upload(image, folder);
        });
        Promise.all(chainUpload)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  });
};

module.exports = {
  uploadManyFile,
  uploadFile,
};
