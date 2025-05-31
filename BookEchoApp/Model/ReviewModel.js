import { supabase } from '../screens/Supabase/lib/supabaseClient';


export async function saveReview({ userId, bookId, title, review, rating }) {
  const { data, error } = await supabase
    .from('ressenyes')
    .insert([{ user_id: userId, book_id: bookId, title, review, rating }])
    .select();
  if (error) throw error;
  return data;
}

export async function fetchReviewsByBook(bookId) {
  const { data, error } = await supabase
    .from('ressenyes')
    .select('*, user:user_id(id, username, avatar_url)')
    .eq('book_id', bookId);
  if (error) throw error;
  return data;
}

export async function fetchReviewsByUser(userId) {
  const { data, error } = await supabase
    .from('ressenyes')
    .select('*, user:user_id(id, username, avatar_url)')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}
