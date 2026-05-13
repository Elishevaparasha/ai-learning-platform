import { User } from './User';
import {Category} from './Category';
import {SubCategory} from './SubCategory';
import {Prompt } from './Prompt';

// הגדרת קשרים (Associations)
Category.hasMany(SubCategory, { foreignKey: 'category_id' });
SubCategory.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Prompt, { foreignKey: 'user_id' });
Prompt.belongsTo(User, { foreignKey: 'user_id' });

SubCategory.hasMany(Prompt, { foreignKey: 'sub_category_id' });
Prompt.belongsTo(SubCategory, { foreignKey: 'sub_category_id' });

export { User, Category, SubCategory, Prompt };
