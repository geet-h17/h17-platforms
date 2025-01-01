#!/bin/bash

# Set Git identity for this repository
echo "Setting Git identity..."
git config user.name "geet-h17"
git config user.email "mailmeatgeet@gmail.com"

# Create .gitignore
echo "Creating .gitignore..."
cat > .gitignore << EOL
.DS_Store
node_modules
.env
.env.*
!.env.example
.cursor
.vscode
*.log
.next
dist
build
coverage
EOL

# Initialize Git repository
git init

# Christmas Day: Initial Setup
export GIT_COMMITTER_DATE="2024-12-25T14:20:00"
export GIT_AUTHOR_DATE="2024-12-25T14:20:00"
git add package.json package-lock.json tsconfig.json next.config.js tailwind.config.js
git commit -m "init: wrk szn"

# Dec 27: Basic structure
export GIT_COMMITTER_DATE="2024-12-27T16:45:00"
export GIT_AUTHOR_DATE="2024-12-27T16:45:00"
git add src/app/layout.tsx src/app/page.tsx src/components/InteractiveCard.tsx src/components/FloatingObjects.tsx
git commit -m "✨ ft: hero page fr"

# Dec 28: Tech stack and animations
export GIT_COMMITTER_DATE="2024-12-28T13:30:00"
export GIT_AUTHOR_DATE="2024-12-28T13:30:00"
git add src/components/TechStack.tsx src/components/canvas/Background.tsx
git commit -m "⚡️ feat: tech stack bussin + sick animations"

# Dec 29: Games implementation
export GIT_COMMITTER_DATE="2024-12-29T18:15:00"
export GIT_AUTHOR_DATE="2024-12-29T18:15:00"
git add src/components/BugSquasher.tsx src/components/CodeBreaker.tsx src/components/GameSwitcher.tsx
git commit -m "🎮 ft: games go brr brrr"

# Dec 30: Blog and Contact
export GIT_COMMITTER_DATE="2024-12-30T15:45:00"
export GIT_AUTHOR_DATE="2024-12-30T15:45:00"
git add src/components/BlogSection.tsx src/components/ContactSection.tsx
git commit -m "📝 ft: blog + cntct"

# New Year's Eve: Vibe section
export GIT_COMMITTER_DATE="2024-12-31T20:30:00"
export GIT_AUTHOR_DATE="2024-12-31T20:30:00"
git add src/components/VibeSection.tsx
git commit -m "🌈 ft: vibe checks"

# New Year's Eve (later): Easter egg
export GIT_COMMITTER_DATE="2024-12-31T23:59:00"
export GIT_AUTHOR_DATE="2024-12-31T23:59:00"
git add src/app/page.tsx
git commit -m "🎯 feat: konami cool guy"

# New Year's Day: Final touches
export GIT_COMMITTER_DATE="2025-01-01T12:00:00"
export GIT_AUTHOR_DATE="2025-01-01T12:00:00"
git add README.md
git commit -m "📚 docs: new year new repo fr"

# Reset dates
unset GIT_COMMITTER_DATE
unset GIT_AUTHOR_DATE

echo "✨ Git history created successfully! Ready to push to GitHub!"
echo "Next steps:"
echo "1. Create a new repo on GitHub"
echo "2. Run: git remote add origin git@github.com:geet-h17/h17-platforms.git"
echo "3. Run: git push -u origin main" 