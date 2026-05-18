import sequelize from './config/database';
import { Category } from './models/Category';
import { SubCategory } from './models/SubCategory';
import './models';
import dotenv from 'dotenv';
dotenv.config();

const seedData = [
  {
    name: 'מדע',
    subCategories: ['חלל ואסטרונומיה', 'פיזיקה', 'כימיה', 'ביולוגיה', 'גנטיקה ו-DNA', 'אקולוגיה וסביבה']
  },
  {
    name: 'טכנולוגיה',
    subCategories: ['בינה מלאכותית', 'פיתוח אתרים', 'אבטחת מידע', 'מדעי המחשב', 'מחשוב ענן', 'פיתוח אפליקציות מובייל']
  },
  {
    name: 'היסטוריה',
    subCategories: ['היסטוריה עולמית', 'היסטוריה של ישראל', 'מלחמות העולם', 'ציוויליזציות קדומות', 'המהפכה התעשייתית', 'האימפריה הרומית']
  },
  {
    name: 'מתמטיקה',
    subCategories: ['אלגברה', 'גיאומטריה', 'חשבון דיפרנציאלי', 'סטטיסטיקה', 'תורת הקבוצות', 'מתמטיקה בדידה']
  },
  {
    name: 'שפות',
    subCategories: ['אנגלית', 'ספרדית', 'צרפתית', 'ערבית', 'יפנית', 'גרמנית']
  },
  {
    name: 'פילוסופיה',
    subCategories: ['פילוסופיה יוונית קלאסית', 'אתיקה ומוסר', 'פילוסופיה של המדע', 'אקזיסטנציאליזם', 'לוגיקה וטיעונים']
  },
  {
    name: 'כלכלה ועסקים',
    subCategories: ['מאקרו-כלכלה', 'מיקרו-כלכלה', 'שוק ההון', 'יזמות וסטארטאפים', 'שיווק דיגיטלי', 'ניהול פיננסי']
  },
  {
    name: 'אמנות ויצירה',
    subCategories: ['היסטוריה של האמנות', 'מוזיקה ותיאוריה', 'צילום', 'עיצוב גרפי', 'קולנוע וקריאייטיב']
  },
  {
    name: 'בריאות ורפואה',
    subCategories: ['אנטומיה ופיזיולוגיה', 'תזונה ובריאות', 'פסיכולוגיה', 'רפואה מונעת', 'נוירולוגיה ומוח']
  },
  {
    name: 'משפטים וחברה',
    subCategories: ['משפט חוקתי', 'זכויות אדם', 'משפט בינלאומי', 'סוציולוגיה', 'מדע המדינה']
  }
];

const seed = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ DB connected');

    for (const cat of seedData) {
      const [category] = await Category.findOrCreate({ where: { name: cat.name } });
      for (const subName of cat.subCategories) {
        await SubCategory.findOrCreate({ where: { name: subName, categoryId: category.id }, defaults: { name: subName, categoryId: category.id } });
      }
    }

    console.log('✅ Seed completed! Categories and subcategories inserted.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
};

seed();
