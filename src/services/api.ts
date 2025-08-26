const API_BASE_URL = 'https://late-again-api.onrender.com';

export interface ExcuseResponse {
  category: string;
  excuses: string[];
  count: number;
}

export interface CategoriesResponse {
  categories: string[];
}

export class ExcuseAPI {
  static async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: CategoriesResponse = await response.json();
      return data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to default categories if API fails
      return ['late_for_work', 'not_sending_money', 'school'];
    }
  }

  static async getExcuses(category: string): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/excuses?category=${encodeURIComponent(category)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ExcuseResponse = await response.json();
      return data.excuses;
    } catch (error) {
      console.error(`Error fetching excuses for category ${category}:`, error);
      // Return empty array if API fails
      return [];
    }
  }

  static async getRandomExcuse(category: string): Promise<string | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/excuse?category=${encodeURIComponent(category)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.excuse || null;
    } catch (error) {
      console.error(`Error fetching random excuse for category ${category}:`, error);
      return null;
    }
  }

  static getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      'late_for_work': 'Late for Work',
      'not_sending_money': 'Not Sending Money',
      'school': 'School Excuses',
      'meeting': 'Meeting Excuses',
      'gym': 'Gym Excuses',
      'cant_go_to_work': "Can't Go to Work",
      'cant_send_money': "Can't Send Money",
      'cant_do_homework': "Can't Do Homework",
      'cant_attend_meeting': "Can't Attend Meeting",
      'cant_go_to_party': "Can't Go to Party",
      'cant_go_to_gym': "Can't Go to Gym",
      'cant_play_games': "Can't Play Games",
      'developer': 'Developer Excuses'
    };
    return labels[category] || category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}
