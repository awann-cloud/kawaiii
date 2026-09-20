-- UNO Deck: Supabase Schema

-- 1. Create custom enum for category
CREATE TYPE card_category AS ENUM ('merah', 'biru', 'hijau', 'kuning');
CREATE TYPE card_status AS ENUM ('aktif', 'selesai');

-- 2. Create targets table
CREATE TABLE public.targets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category card_category NOT NULL,
    weight INTEGER NOT NULL CHECK (weight IN (2, 4)),
    status card_status DEFAULT 'aktif' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 3. Create steps table
CREATE TABLE public.steps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    target_id UUID REFERENCES public.targets(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    is_done BOOLEAN DEFAULT FALSE NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create transfers table (for opponent deck)
CREATE TABLE public.transfers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    target_id UUID REFERENCES public.targets(id) ON DELETE CASCADE NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Row Level Security (RLS)
ALTER TABLE public.targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transfers ENABLE ROW LEVEL SECURITY;

-- Targets Policies
CREATE POLICY "Users can view their own targets"
    ON public.targets FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own targets"
    ON public.targets FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own targets"
    ON public.targets FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own targets"
    ON public.targets FOR DELETE
    USING (auth.uid() = user_id);

-- Steps Policies
CREATE POLICY "Users can view steps of their targets"
    ON public.steps FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.targets
        WHERE targets.id = steps.target_id AND targets.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert steps to their targets"
    ON public.steps FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.targets
        WHERE targets.id = steps.target_id AND targets.user_id = auth.uid()
    ));

CREATE POLICY "Users can update steps of their targets"
    ON public.steps FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.targets
        WHERE targets.id = steps.target_id AND targets.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete steps of their targets"
    ON public.steps FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM public.targets
        WHERE targets.id = steps.target_id AND targets.user_id = auth.uid()
    ));

-- Transfers Policies
CREATE POLICY "Users can view their own transfers"
    ON public.transfers FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transfers"
    ON public.transfers FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 6. Setup Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.targets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.steps;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transfers;
