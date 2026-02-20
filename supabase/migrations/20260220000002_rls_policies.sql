-- Profiles: Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Watchlists: Users can only manage their own watchlists
CREATE POLICY "Users can view own watchlists" ON watchlists FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own watchlists" ON watchlists FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own watchlists" ON watchlists FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own watchlists" ON watchlists FOR DELETE USING (user_id = auth.uid());

-- Watchlist Items: Linked to watchlists
CREATE POLICY "Users can view own watchlist items" ON watchlist_items FOR SELECT USING (watchlist_id IN (SELECT id FROM watchlists WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own watchlist items" ON watchlist_items FOR ALL USING (watchlist_id IN (SELECT id FROM watchlists WHERE user_id = auth.uid()));

-- Agents: Users manage their own agents
CREATE POLICY "Users can view own agents" ON agents FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can manage own agents" ON agents FOR ALL USING (user_id = auth.uid());

-- Alerts: Linked to user's agents
CREATE POLICY "Users can view own alerts" ON alerts FOR SELECT USING (agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid()));
CREATE POLICY "Users can update own alerts" ON alerts FOR UPDATE USING (agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid()));

-- Trades: Users manage their own trades
CREATE POLICY "Users can view own trades" ON trades FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can manage own trades" ON trades FOR ALL USING (user_id = auth.uid());

-- Conversations & Messages: User specific
CREATE POLICY "Users can view own conversations" ON conversations FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can manage own conversations" ON conversations FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (conversation_id IN (SELECT id FROM conversations WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own messages" ON messages FOR INSERT WITH CHECK (conversation_id IN (SELECT id FROM conversations WHERE user_id = auth.uid()));

-- Prompt Versions: Read-only for authenticated users
CREATE POLICY "Authenticated users can view prompts" ON prompt_versions FOR SELECT TO authenticated USING (true);
