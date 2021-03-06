drop table if exists bookmarks;

create table bookmarks ( 
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, 
  title TEXT NOT NULL, 
  url TEXT NOT NULL, 
  description TEXT, 
  rating INTEGER DEFAULT 3
);

insert into bookmarks (title, url, description, rating)
  values 
    ('Facebook', 'facebook.com', 'Social network', 1), 
    ('Axios', 'axios.com', 'News site', 5), 
    ('Politico', 'politico.com', 'News site', 4), 
    ('Google', 'google.com', 'Search engine', 3), 
    ('YouTube', 'youtube.com', 'Misinformation site', 1), 
    ('Twitter', 'twitter.com', 'Social network', 1), 
    ('Reddit', 'reddit.com', 'Misinformation site', 1), 
    ('Wikipedia', 'wikipedia.com', 'Information site', 5), 
    ('Snopes', 'snopes.com', 'Fact checker', 5), 
    ('Gmail', 'gmail.com', 'Email site', 3);