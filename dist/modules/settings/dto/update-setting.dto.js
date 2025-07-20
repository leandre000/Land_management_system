"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSettingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_setting_dto_1 = require("./create-setting.dto");
class UpdateSettingDto extends (0, swagger_1.PartialType)(create_setting_dto_1.CreateSettingDto) {
}
exports.UpdateSettingDto = UpdateSettingDto;
//# sourceMappingURL=update-setting.dto.js.map