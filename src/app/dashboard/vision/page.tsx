'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';

const categories = [
  { name: 'All', icon: '✨' },
  { name: 'Career', icon: '💼' },
  { name: 'Health', icon: '💪' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { name: 'Financial', icon: '💰' },
];

const mockVisionBoard = [
  {
    id: 1,
    title: 'Dream Vacation to Bali',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=300&h=200&fit=crop',
    description: 'Explore temples and beautiful beaches',
  },
  {
    id: 2,
    title: 'Senior Developer Role',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop',
    description: 'Lead a team and build amazing products',
  },
  {
    id: 3,
    title: 'Marathon Finish',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop',
    description: 'Complete my first marathon',
  },
  {
    id: 4,
    title: 'New House',
    category: 'Financial',
    image: 'https://images.unsplash.com/photo-1570129477492-45ac003000c0?w=300&h=200&fit=crop',
    description: 'Own a beautiful home with a garden',
  },
  {
    id: 5,
    title: 'Learn Photography',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop',
    description: 'Master photography and videography',
  },
  {
    id: 6,
    title: 'Time with Family',
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=200&fit=crop',
    description: 'Create lasting memories',
  },
];

export default function VisionBoard() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems =
    selectedCategory === 'All'
      ? mockVisionBoard
      : mockVisionBoard.filter((item) => item.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vision Board</h1>
          <p className="text-muted-foreground">Visualize your dreams and future goals</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Vision
        </Button>
      </motion.div>

      {/* Category Filter */}
      <motion.div variants={itemVariants} className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat.name}
            variant={selectedCategory === cat.name ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat.name)}
            className="gap-1"
          >
            {cat.icon} {cat.name}
          </Button>
        ))}
      </motion.div>

      {/* Vision Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="glass border-white/20 h-full flex flex-col hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
                  <CardDescription className="flex-1">{item.description}</CardDescription>

                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <Upload className="w-4 h-4" />
                    Update
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Inspiration Section */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-white/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <CardHeader>
            <CardTitle>Vision Board Tips</CardTitle>
            <CardDescription>How to make the most of your vision board</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Be Specific</h4>
                <p className="text-sm text-muted-foreground">
                  Add detailed descriptions to your visions. The more specific, the better you can visualize them.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Review Regularly</h4>
                <p className="text-sm text-muted-foreground">
                  Look at your vision board daily. This keeps your goals at the forefront of your mind.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Take Action</h4>
                <p className="text-sm text-muted-foreground">
                  Break down your visions into actionable goals and tasks in your dashboard.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Celebrate Progress</h4>
                <p className="text-sm text-muted-foreground">
                  Update your vision board as you make progress toward your dreams.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upload Section */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-white/20 border-dashed">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Upload className="w-12 h-12 text-muted-foreground" />
              <div className="text-center">
                <h3 className="font-semibold mb-2">Add a Vision Image</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop an image or click to browse
                </p>
              </div>
              <Button>Choose Image</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quote */}
      <motion.div variants={itemVariants} className="text-center py-8">
        <blockquote className="text-2xl font-semibold text-primary mb-2">
          "Your vision will become clear only when you look into your own heart."
        </blockquote>
        <p className="text-muted-foreground">— Carl Jung</p>
      </motion.div>
    </motion.div>
  );
}
