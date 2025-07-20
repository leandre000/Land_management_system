import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSetting, SettingType } from './entities/system-setting.entity';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SystemSetting)
    private readonly settingRepository: Repository<SystemSetting>,
  ) {}

  async create(createSettingDto: CreateSettingDto): Promise<SystemSetting> {
    const existingSetting = await this.settingRepository.findOne({
      where: {
        type: createSettingDto.type,
        key: createSettingDto.key,
      },
    });

    if (existingSetting) {
      throw new ConflictException('Setting already exists');
    }

    const setting = this.settingRepository.create(createSettingDto);
    return this.settingRepository.save(setting);
  }

  async findAll(): Promise<SystemSetting[]> {
    return this.settingRepository.find();
  }

  async findOne(id: string): Promise<SystemSetting> {
    const setting = await this.settingRepository.findOne({ where: { id } });
    if (!setting) {
      throw new NotFoundException(`Setting with ID "${id}" not found`);
    }
    return setting;
  }

  async findByType(type: SettingType): Promise<SystemSetting[]> {
    return this.settingRepository.find({
      where: { type },
      order: { key: 'ASC' },
    });
  }

  async findByKey(key: string): Promise<SystemSetting> {
    const setting = await this.settingRepository.findOne({ where: { key } });
    if (!setting) {
      throw new NotFoundException(`Setting with key "${key}" not found`);
    }
    return setting;
  }

  async update(id: string, updateSettingDto: UpdateSettingDto): Promise<SystemSetting> {
    const setting = await this.findOne(id);

    if (updateSettingDto.key && updateSettingDto.key !== setting.key) {
      const existingSetting = await this.settingRepository.findOne({
        where: {
          type: setting.type,
          key: updateSettingDto.key,
        },
      });

      if (existingSetting) {
        throw new ConflictException('Setting with this key already exists');
      }
    }

    Object.assign(setting, updateSettingDto);
    return this.settingRepository.save(setting);
  }

  async remove(id: string): Promise<void> {
    const result = await this.settingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Setting with ID "${id}" not found`);
    }
  }

  async getSettingValue(type: SettingType, key: string): Promise<any> {
    const setting = await this.settingRepository.findOne({
      where: {
        type,
        key,
        isActive: true,
      },
    });

    if (!setting) {
      throw new NotFoundException(`Setting with type "${type}" and key "${key}" not found`);
    }

    return setting.value;
  }

  async bulkUpdate(settings: UpdateSettingDto[]): Promise<SystemSetting[]> {
    const updatedSettings: SystemSetting[] = [];

    for (const setting of settings) {
      if (!setting.key) {
        throw new ConflictException('Key is required for bulk update');
      }

      const existingSetting = await this.settingRepository.findOne({
        where: { key: setting.key },
      });

      if (!existingSetting) {
        throw new NotFoundException(`Setting with key "${setting.key}" not found`);
      }

      Object.assign(existingSetting, setting);
      updatedSettings.push(await this.settingRepository.save(existingSetting));
    }

    return updatedSettings;
  }

  async getActiveSettings(): Promise<SystemSetting[]> {
    return this.settingRepository.find({
      where: { isActive: true },
      order: { type: 'ASC', key: 'ASC' },
    });
  }
} 